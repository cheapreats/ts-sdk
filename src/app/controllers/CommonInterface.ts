export enum WhereFilterOperator {
  EQUALS = "EQUALS",
  REGEX = "REGEX",
  GREATER_THAN = "GREATER_THAN",
  GREATER_THAN_OR_EQUAL = "GREATER_THAN_OR_EQUAL",
  LESS_THAN = "LESS_THAN",
  LESS_THAN_OR_EQUAL = "LESS_THAN_OR_EQUAL",
  EXISTS = "EXISTS",
  DOES_NOT_EXIST = "DOES_NOT_EXIST"
}
export enum WhereFilterGroupOperator {
  AND = "AND",
  OR = "OR"
}
export interface WhereFilterInput {
  field: string;
  match?: string;
  operator?: WhereFilterOperator; // default EQUALS
}
export interface WhereFilterGroupInput {
  operator?: WhereFilterGroupOperator; // default AND
  filter_groups?: Array<WhereFilterGroupInput>;
  filters?: Array<WhereFilterInput>;
}
export interface SelectInput {
  where?: WhereFilterGroupInput;
  limit?: number; // default 100
  skip?: number; // default 0
}
