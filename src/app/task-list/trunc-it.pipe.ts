import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncIt',
  standalone: true
})
export class TruncItPipe implements PipeTransform {

  transform(value: string, ...args: number[]): string {
     let title =value;
     if(args.length > 0){
        let numToTrunc = args[0] > 10 ? 10 : args[0];

          title =  title.substring(0,numToTrunc ) + ".."
     }

    return title;
  }

}
