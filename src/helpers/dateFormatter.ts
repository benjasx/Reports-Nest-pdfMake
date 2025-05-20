

export class DateFormatter{
    static formater = Intl.DateTimeFormat('es-ES',{
        year:'numeric',
        month:'long',
        day:'2-digit'
    });
    static getDDMMMMYYYY(date: Date): string{

        return this.formater.format(date)
    }
}