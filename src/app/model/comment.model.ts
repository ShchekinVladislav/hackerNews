export interface CommentModel{
  id: string;
  author: string;
  text: string;
  dateCreate: number;
  parent: number;
  child: CommentModel[];
}
