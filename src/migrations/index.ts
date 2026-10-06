import * as migration_20261005_202918_initial from './20261005_202918_initial';
import * as migration_20261005_205854_gallery_fields from './20261005_205854_gallery_fields';
import * as migration_20261006_035609_feedback from './20261006_035609_feedback';
import * as migration_20261006_051125_profile_latest_position from './20261006_051125_profile_latest_position';
import * as migration_20261006_094540_highlight_comments from './20261006_094540_highlight_comments';

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
    name: '20261006_035609_feedback',
  },
  {
    up: migration_20261006_051125_profile_latest_position.up,
    down: migration_20261006_051125_profile_latest_position.down,
    name: '20261006_051125_profile_latest_position',
  },
  {
    up: migration_20261006_094540_highlight_comments.up,
    down: migration_20261006_094540_highlight_comments.down,
    name: '20261006_094540_highlight_comments'
  },
];
