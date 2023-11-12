export interface CourseParts {
  courseParts: CoursePart[];
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBasic extends CoursePartBase {
  kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartBackground extends CoursePartBase {
  backgroundMaterial: string;
  kind: "background";
}

interface CoursePartDescription extends CoursePartBase {
  description: string;
}

interface CoursePartSpecial extends CoursePartBase {
  requirements: string[];
  kind: "special";
}

export type CoursePart =
  | CoursePartGroup
  | (CoursePartDescription & CoursePartBasic)
  | (CoursePartDescription & CoursePartBackground)
  | (CoursePartDescription & CoursePartSpecial);
