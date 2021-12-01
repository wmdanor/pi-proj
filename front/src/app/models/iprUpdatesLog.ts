enum IprUpdatesLogsType {
  Test
}
export interface IprUpdatesLog {
  id: string
  iprId: string;
  createdAt: Date
  userId: string
  affectedIprId: string
  type: IprUpdatesLogsType
  updateReason: string
  description: string
  documentNumber: string | null
}