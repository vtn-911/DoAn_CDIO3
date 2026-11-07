# Merge admin and bangiamhieu profiles

This migration is intentionally not applied automatically. MySQL DDL implicitly
commits, so take a verified backup and run the checks below immediately before
applying it.

## Preflight

The table inventory must show `admin` and `bangiamhieu` and must not show an
existing `phongdaotao` table. The duplicate/orphan queries must return zero rows.
Do not apply the migration if the legacy tables or required columns differ from
these assumptions.

```sql
SELECT TABLE_NAME
FROM information_schema.TABLES
WHERE TABLE_SCHEMA = DATABASE()
  AND TABLE_NAME IN ('admin', 'bangiamhieu', 'phongdaotao');

SELECT nguoiDung, COUNT(*) AS profileCount
FROM (
  SELECT nguoiDung FROM admin
  UNION ALL
  SELECT nguoiDung FROM bangiamhieu
) AS profiles
GROUP BY nguoiDung
HAVING COUNT(*) > 1;

SELECT a.maAdmin FROM admin a
LEFT JOIN nguoidung u ON u.idND = a.nguoiDung
WHERE u.idND IS NULL;

SELECT b.maBGH FROM bangiamhieu b
LEFT JOIN nguoidung u ON u.idND = b.nguoiDung
WHERE u.idND IS NULL;

SELECT l.maLop, l.bghId FROM lophoc l
LEFT JOIN bangiamhieu b ON b.maBGH = l.bghId
WHERE l.bghId IS NOT NULL AND b.maBGH IS NULL;

SELECT TABLE_NAME, CONSTRAINT_NAME, COLUMN_NAME,
       REFERENCED_TABLE_NAME, REFERENCED_COLUMN_NAME
FROM information_schema.KEY_COLUMN_USAGE
WHERE TABLE_SCHEMA = DATABASE()
  AND REFERENCED_TABLE_NAME IN ('admin', 'bangiamhieu');
```

Check for an existing `phongdaotao` table before applying. If present, stop and
reconcile its rows; do not drop or overwrite it.

## Apply and verify

Apply `migration.sql` using the project's reviewed migration process. It creates
`phongdaotao`, copies each legacy row with a deterministic source-prefixed key,
and redirects the existing `lophoc.bghId` foreign key. It does not drop either
legacy table.

After applying, verify that `phongdaotao` has the combined source-row count, each
legacy `nguoiDung` occurs exactly once there, and `lophoc.bghId` has no orphaned
references. Keep `admin` and `bangiamhieu` until those checks and application
smoke tests pass. Dropping legacy tables is a separate, explicitly approved
cleanup migration and is not included here.