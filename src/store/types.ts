export type globalType = {
  sidebar: {
    status: 'expanded' | 'collapsed' | 'hidden';
  };
  viewportSize: {
    width: number;
    height: number;
  };
};

export type permissionType = {
  shortcutList: Array<any>;
};
