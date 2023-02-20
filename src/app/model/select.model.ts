export interface SelectModel{
  ctrName: string;
  label: string;
  value: string;
}

export interface SelectListItem{
  id: 'story' | 'poll' | 'show_hn' | 'ask_hn' | 'front_page';
  name: string;
}

export interface SelectChangeValue{
  id: 'story' | 'poll'| 'show_hn' | 'ask_hn' | 'front_page';
  ctrName: string;
}

export const SelectList: SelectListItem[] = [
  {
    id: 'story',
    name: 'Story'
  },
  {
    id: 'poll',
    name: 'Poll'
  },
  {
    id: 'show_hn',
    name: 'Show hn'
  },
  {
    id: 'ask_hn',
    name: 'Ask hn'
  },
  {
    id: 'front_page',
    name: 'Front page'
  },
];
