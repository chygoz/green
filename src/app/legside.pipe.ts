import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'legside'
})
export class LegsidePipe implements PipeTransform {

  transform(value: any, leg, _id): unknown {
    if(value.length > 0) {
      let returnVal = false;
      for (const iterator of value) {
        if((leg == 'left') && (iterator.leftLeg == true) && (iterator.show_below == _id)){
          returnVal = true;
        }
        if(leg == 'right' && (iterator.rightLeg == true)  && (iterator.show_below == _id)){
          returnVal = true;
        }
      }
      return returnVal;

    }else {
      return false;
    }
  }

}
