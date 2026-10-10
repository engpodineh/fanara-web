import * as migration_20261005_202918_initial from './20261005_202918_initial';
import * as migration_20261005_205854_gallery_fields from './20261005_205854_gallery_fields';
import * as migration_20261006_035609_feedback from './20261006_035609_feedback';
import * as migration_20261006_051125_profile_latest_position from './20261006_051125_profile_latest_position';
import * as migration_20261006_094540_highlight_comments from './20261006_094540_highlight_comments';
import * as migration_20261006_100900_ai_settings from './20261006_100900_ai_settings';
import * as migration_20261006_105552_team from './20261006_105552_team';
import * as migration_20261006_110735_team_contact from './20261006_110735_team_contact';
import * as migration_20261006_131500_shams_project from './20261006_131500_shams_project';
import * as migration_20261010_130000_oman_project_and_standards from './20261010_130000_oman_project_and_standards';
import * as migration_20261006_143000_team_bashouke_mechanical from './20261006_143000_team_bashouke_mechanical';
import * as migration_20261006_140000_team_members from './20261006_140000_team_members';

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
    name: '20261006_094540_highlight_comments',
  },
  {
    up: migration_20261006_100900_ai_settings.up,
    down: migration_20261006_100900_ai_settings.down,
    name: '20261006_100900_ai_settings',
  },
  {
    up: migration_20261006_105552_team.up,
    down: migration_20261006_105552_team.down,
    name: '20261006_105552_team',
  },
  {
    up: migration_20261006_110735_team_contact.up,
    down: migration_20261006_110735_team_contact.down,
    name: '20261006_110735_team_contact',
  },
  {
    up: migration_20261006_131500_shams_project.up,
    down: migration_20261006_131500_shams_project.down,
    name: '20261006_131500_shams_project',
  },
  {
    up: migration_20261006_140000_team_members.up,
    down: migration_20261006_140000_team_members.down,
    name: '20261006_140000_team_members'
  },
  {
    up: migration_20261006_143000_team_bashouke_mechanical.up,
    down: migration_20261006_143000_team_bashouke_mechanical.down,
    name: '20261006_143000_team_bashouke_mechanical',
  },
  {
    up: migration_20261010_130000_oman_project_and_standards.up,
    down: migration_20261010_130000_oman_project_and_standards.down,
    name: '20261010_130000_oman_project_and_standards',
  },
];
