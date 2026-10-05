import * as migration_20261005_202918_initial from './20261005_202918_initial';

export const migrations = [
  {
    up: migration_20261005_202918_initial.up,
    down: migration_20261005_202918_initial.down,
    name: '20261005_202918_initial'
  },
];
