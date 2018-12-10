import { Category } from './category.model'

export class Question {
  id: string;
  questionText: string;
  answers: Answer[];
  ordered: boolean;
  explanation?: string;
  tags: string[];
  categories: Category[];
  categoryIds: number[];
  published: boolean;
  status: QuestionStatus;
  createdBy?: string;
  createdOn?: Date;
  lastUpdatedBy?: string;
  lastUpdatedOn?: Date;
  approvedBy?: string;
  approvedOn?: Date;
  
  constructor() {
    this.answers = [new Answer(), new Answer(), new Answer(), new Answer()];
    this.ordered = false;
    this.tags = [];
    this.categories = [];
    this.categoryIds = [];
    this.published = false;
    this.status = QuestionStatus.SAVED;
  }
}

export class Answer {
  id: number;
  answerText: string;
  correct: boolean;
}

export enum QuestionStatus {
  SAVED,
  SUBMITTED,
  APPROVED,
  INACTIVE
}