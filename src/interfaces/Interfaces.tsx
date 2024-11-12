export interface Record {
  id: number;
  title: string;
  url: string;
  type: string;
  bankgiro: string;
  comments: string;
  priority: number;
  lastUpdated: string;
  status: string;
}

export interface BalanceForm {
  id: number;
  exDesc: string;
  exDate: Date;
  exType: string;
  effectiveMonth: string;
  payMethod: string;
  ocr: string;
  exAmount: number;
  paidStatus: string;
  exPaidBy: string;
  comment: string;
  lastUpdated: Date;
  status: boolean;
  templateId: number;
  expectedDate: Date;
}

export interface PexTemplate {
  id: number;
  exDesc: string;
  bankgiro: string;
  exAmount: number;
  comment: string;
  scheduleDate: Date;
  status: boolean;
  keywords: string;
}

export interface RestProps {
  data: [];
  loading: boolean;
  error: boolean;
}

export interface Summery {
  monthlyIncome: number;
  monthlyExpenses: number;
  currentPaid: number;
  remainingPay: number;
  curMonth: string;
}

export interface Info {
  id: number;
  info: string;
  title: string;
  description: string;
  comments: string;
  lastUpdated: Date;
  status: boolean;
}

export interface Jira {
  id: string;
  jira: string;
  title: string;
  currentStage: string;
  description: string;
  comments: string;
  lastUpdated: Date;
  status: boolean;
}

export interface Info {
  id: number;
  info: string;
  title: string;
  description: string;
  comments: string;
  lastUpdated: Date;
  status: boolean;
}
