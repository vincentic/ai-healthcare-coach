#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ENV_FILE="$ROOT_DIR/backend/.env"
EXPORT_DIR="$ROOT_DIR/mysql/export"
STATIC_DIR="$ROOT_DIR/frontend/public/static-data"

DB_HOST="${DB_HOST:-localhost}"
DB_PORT="${DB_PORT:-3306}"
DB_USERNAME="${DB_USERNAME:-root}"
DB_PASSWORD="${DB_PASSWORD:-}"
DB_DATABASE="${DB_DATABASE:-growth_system}"

if [ -f "$ENV_FILE" ]; then
  set -a
  . "$ENV_FILE"
  set +a
fi

mkdir -p "$EXPORT_DIR" "$STATIC_DIR"

STAMP="$(date +%Y%m%d-%H%M%S)"
SQL_FILE="$EXPORT_DIR/${DB_DATABASE}-${STAMP}.sql"
TABLE_FILE="$EXPORT_DIR/${DB_DATABASE}-${STAMP}-tables.tsv"
STATUS_FILE="$STATIC_DIR/mysql-export-status.json"
SUMMARY_FILE="$STATIC_DIR/mysql-summary.json"

export MYSQL_PWD="${DB_PASSWORD:-}"

mysql --protocol=TCP -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USERNAME" -D "$DB_DATABASE" \
  -e "SHOW TABLE STATUS;" > "$TABLE_FILE"

mysql --protocol=TCP -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USERNAME" -N -B -D "$DB_DATABASE" \
  -e "SELECT JSON_OBJECT('database', '$DB_DATABASE', 'exportedAt', DATE_FORMAT(UTC_TIMESTAMP(), '%Y-%m-%dT%H:%i:%sZ'), 'tableCount', COUNT(*), 'totalRows', COALESCE(SUM(TABLE_ROWS), 0), 'tables', JSON_ARRAYAGG(JSON_OBJECT('tableName', TABLE_NAME, 'rows', TABLE_ROWS, 'engine', ENGINE, 'createdAt', DATE_FORMAT(CREATE_TIME, '%Y-%m-%d %H:%i:%s'), 'updatedAt', DATE_FORMAT(UPDATE_TIME, '%Y-%m-%d %H:%i:%s')))) FROM information_schema.TABLES WHERE TABLE_SCHEMA = '$DB_DATABASE' ORDER BY TABLE_NAME;" > "$SUMMARY_FILE"

mysqldump \
  --protocol=TCP \
  -h "$DB_HOST" \
  -P "$DB_PORT" \
  -u "$DB_USERNAME" \
  --single-transaction \
  --routines \
  --triggers \
  --events \
  "$DB_DATABASE" > "$SQL_FILE"

cat > "$STATUS_FILE" <<JSON
{
  "database": "$DB_DATABASE",
  "exportedAt": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
  "status": "exported",
  "sqlFile": "mysql/export/$(basename "$SQL_FILE")",
  "tableSummaryFile": "mysql/export/$(basename "$TABLE_FILE")",
  "staticSummaryFile": "static-data/mysql-summary.json"
}
JSON

echo "Exported $DB_DATABASE to $SQL_FILE"
