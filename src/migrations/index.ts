import * as migration_20261005_202918_initial from './20261005_202918_initial';
import * as migration_20261005_205854_gallery_fields from './20261005_205854_gallery_fields';
import * as migration_20261006_035609_feedback from './20261006_035609_feedback';

export const migrations = [
  {
    up: migration_20261005_202918_initial.up,
    down: migration_20261005_202918_initial.down,
    name: '20261005_202918_initial',
  },
  {
    up: migration_20261005_205854_gallery_fields.up,
    down: migration_20261005_205854_gallery_fields.down,
    name: '20261005_205854_gallery_fields',
  },
  {
    up: migration_20261006_035609_feedback.up,
    down: migration_20261006_035609_feedback.down,
    name: '20261006_035609_feedback'
  },
];
