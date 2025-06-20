import { alovaInstance } from '@/utils/request';

export const getErrorList = (params: any) => {
  return alovaInstance.Get('/error/list', {
    params: {
      ...params,
      size: params.pageSize,
    },
  });
};
