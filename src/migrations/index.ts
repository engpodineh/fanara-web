import * as migration_20261005_202918_initial from './20261005_202918_initial';
import * as migration_20261005_205854_gallery_fields from './20261005_205854_gallery_fields';

export const migrations = [
  {
    up: migration_20261005_202918_initial.up,
    down: migration_20261005_202918_initial.down,
    name: '20261005_202918_initial',
  },
  {
    up: migration_20261005_205854_gallery_fields.up,
    down: migration_20261005_205854_gallery_fields.down,
    name: '20261005_205854_gallery_fields'
  },
];
