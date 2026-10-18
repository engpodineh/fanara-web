import * as migration_20261018_232000_goljaei_education from './20261018_232000_goljaei_education';
import * as migration_20261018_231000_team_profile_documents from './20261018_231000_team_profile_documents';
import * as migration_20261005_202918_initial from './20261005_202918_initial';
import * as migration_20261005_205854_gallery_fields from './20261005_205854_gallery_fields';
import * as migration_20261006_035609_feedback from './20261006_035609_feedback';
import * as migration_20261006_051125_profile_latest_position from './20261006_051125_profile_latest_position';
import * as migration_20261006_094540_highlight_comments from './20261006_094540_highlight_comments';
import * as migration_20261006_100900_ai_settings from './20261006_100900_ai_settings';
import * as migration_20261006_105552_team from './20261006_105552_team';
import * as migration_20261006_110735_team_contact from './20261006_110735_team_contact';
import * as migration_20261006_131500_shams_project from './20261006_131500_shams_project';
import * as migration_20261006_140000_team_members from './20261006_140000_team_members';
import * as migration_20261006_143000_team_bashouke_mechanical from './20261006_143000_team_bashouke_mechanical';
import * as migration_20261010_130000_oman_project_and_standards from './20261010_130000_oman_project_and_standards';
import * as migration_20261010_181500_team_contacts from './20261010_181500_team_contacts';
import * as migration_20261010_204500_team_heidari_contact from './20261010_204500_team_heidari_contact';
import * as migration_20261011_173500_oman_design_videos from './20261011_173500_oman_design_videos';
import * as migration_20261011_210508_notify_settings from './20261011_210508_notify_settings';
import * as migration_20261011_214045_visitor_contact from './20261011_214045_visitor_contact';
import * as migration_20261012_154245_study_materials from './20261012_154245_study_materials';
import * as migration_20261012_190000_study_materials_import from './20261012_190000_study_materials_import';
import * as migration_20261012_193500_concrete_technology_book from './20261012_193500_concrete_technology_book';
import * as migration_20261012_200000_work_orders from './20261012_200000_work_orders';
import * as migration_20261018_230000_team_profiles from './20261018_230000_team_profiles';
import * as migration_20261018_200000_team_civil_goljaei_parvaei from './20261018_200000_team_civil_goljaei_parvaei';
import * as migration_20261018_210000_team_civil_phone_format from './20261018_210000_team_civil_phone_format';
import * as migration_20261018_220000_contracting_turkish from './20261018_220000_contracting_turkish';
import * as migration_20261018_223000_turkish_content from './20261018_223000_turkish_content';

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
    name: '20261006_140000_team_members',
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
  {
    up: migration_20261010_181500_team_contacts.up,
    down: migration_20261010_181500_team_contacts.down,
    name: '20261010_181500_team_contacts',
  },
  {
    up: migration_20261010_204500_team_heidari_contact.up,
    down: migration_20261010_204500_team_heidari_contact.down,
    name: '20261010_204500_team_heidari_contact',
  },
  {
    up: migration_20261011_173500_oman_design_videos.up,
    down: migration_20261011_173500_oman_design_videos.down,
    name: '20261011_173500_oman_design_videos',
  },
  {
    up: migration_20261011_210508_notify_settings.up,
    down: migration_20261011_210508_notify_settings.down,
    name: '20261011_210508_notify_settings',
  },
  {
    up: migration_20261011_214045_visitor_contact.up,
    down: migration_20261011_214045_visitor_contact.down,
    name: '20261011_214045_visitor_contact',
  },
  {
    up: migration_20261012_154245_study_materials.up,
    down: migration_20261012_154245_study_materials.down,
    name: '20261012_154245_study_materials',
  },
  {
    up: migration_20261012_190000_study_materials_import.up,
    down: migration_20261012_190000_study_materials_import.down,
    name: '20261012_190000_study_materials_import',
  },
  {
    up: migration_20261012_193500_concrete_technology_book.up,
    down: migration_20261012_193500_concrete_technology_book.down,
    name: '20261012_193500_concrete_technology_book',
  },
  {
    up: migration_20261012_200000_work_orders.up,
    down: migration_20261012_200000_work_orders.down,
    name: '20261012_200000_work_orders',
  },
  {
    up: migration_20261018_230000_team_profiles.up,
    down: migration_20261018_230000_team_profiles.down,
    name: '20261018_230000_team_profiles',
  },
  {
    up: migration_20261018_200000_team_civil_goljaei_parvaei.up,
    down: migration_20261018_200000_team_civil_goljaei_parvaei.down,
    name: '20261018_200000_team_civil_goljaei_parvaei',
  },
  {
    up: migration_20261018_210000_team_civil_phone_format.up,
    down: migration_20261018_210000_team_civil_phone_format.down,
    name: '20261018_210000_team_civil_phone_format',
  },
  {
    up: migration_20261018_220000_contracting_turkish.up,
    down: migration_20261018_220000_contracting_turkish.down,
    name: '20261018_220000_contracting_turkish',
  },
  {
    up: migration_20261018_223000_turkish_content.up,
    down: migration_20261018_223000_turkish_content.down,
    name: '20261018_223000_turkish_content'
  },
  {
    up: migration_20261018_231000_team_profile_documents.up,
    down: migration_20261018_231000_team_profile_documents.down,
    name: '20261018_231000_team_profile_documents',
  },
  {
    up: migration_20261018_232000_goljaei_education.up,
    down: migration_20261018_232000_goljaei_education.down,
    name: '20261018_232000_goljaei_education',
  },
];
