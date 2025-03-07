export interface AttendanceData {
    id: number;
    employee: string;
    status: string;
    clockIn: string;
    clockOut: string;
    totalHours: string;
}
  
export interface AttendanceDialogProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (e: React.FormEvent) => void;
    isEditMode: boolean;
    selectedRecord: AttendanceData | null;
}