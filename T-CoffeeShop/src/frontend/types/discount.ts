export type Condition = {
  id: number;
  discount_id: number;
  conditionType: string;
  value: number;
  description: string;
};

export type Discount = {
  id: number;
  code: string;
  type: string;
  value: number | null;
  description: string;
  start_date: string;
  end_date: string;
  conditions: Condition[];
};
