import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hours'
})
export class HoursPipe implements PipeTransform {

  // @ts-ignore
  transform(value: any): any {
    const postDate = new Date(value);
    const now = new Date();
    const diffMs = now.getTime() - postDate.getTime();

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `пост создан ${this.formatNumber(days, 'день', 'дня', 'дней')} назад`;
    } else if (hours > 0) {
      return `пост создан ${this.formatNumber(hours, 'час', 'часа', 'часов')} назад`;
    } else if (minutes > 0) {
      return `пост создан ${this.formatNumber(minutes, 'минуту', 'минуты', 'минут')} назад`;
    } else {
      return `пост создан только что`;
    }

  }

  private formatNumber(value: number, one: string, few: string, many: string): string {
    const mod10 = value % 10;
    const mod100 = value % 100;

    if (mod10 === 1 && mod100 !== 11) return `${value} ${one}`;
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return `${value} ${few}`;
    return `${value} ${many}`;
  }


}

