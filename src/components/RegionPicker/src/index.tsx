import { ElCascader } from 'element-plus';
import regions from './regions.json';

interface RegionPickerProps {
  level?: number;
}

export default defineComponent({
  name: 'RegionPicker',
  inheritAttrs: false,
  setup(props: RegionPickerProps, { attrs }) {
    const cascaderProps = { label: 'name', value: 'code', checkStrictly: true };
    return () => <ElCascader {...attrs} props={cascaderProps} options={regions}></ElCascader>;
  },
});

// interface Region {
//   id: string;
//   name: string;
//   code: string;
//   parentId: string;
//   children?: Region[];
// }

// function getRegionsByLevel(regions: Region[], level: number, currentLevel = 1, parentPath: Region[] = []): Region[] {
//   if (level === 3) return regions;
//   const result: Region[] = [];
//
//   regions.forEach(region => {
//     if (region.children) {
//       result.push(...getRegionsByLevel(region.children, level, currentLevel + 1, [...parentPath, region]));
//     }
//   });
// }
