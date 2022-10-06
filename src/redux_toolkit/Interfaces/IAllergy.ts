export type IAllergy = {
  id: number;
  name: string;
  status: 'read' | 'added' | 'edited' | 'deleted';
};
