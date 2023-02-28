import AbstractView from '../framework/view/abstract-view.js';
import {formatDate} from '../utils/date.js';
import {PointFormat, MIN_POINTS_COUNT} from '../const';

const getPrice = (points) => {
  let price = 0;
  points.forEach((point) => {price += Number(point.basePrice);});
  return price;
};

const createTripInfoTemplate = (points) =>{
  const firstPoint = points[0];
  const secondPointName = points.length > MIN_POINTS_COUNT ? '...': points[1].destination.name;
  const lastPoint = points[points.length-1];

  return (
    `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${firstPoint.destination.name} &mdash; ${secondPointName} &mdash; ${lastPoint.destination.name}</h1>

      <p class="trip-info__dates">${formatDate(firstPoint.dateFrom, PointFormat.MONTH)}&nbsp;&mdash;&nbsp;
      ${formatDate(lastPoint.dateTo, PointFormat.MONTH)}</p>
     </div>

    <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${getPrice(points)}</span>
    </p>
  </section>`
  );
};

export default class TripInfoView extends AbstractView{
  #points = null;

  constructor(points){
    super();
    this.#points = points;
  }

  get template(){
    return createTripInfoTemplate(this.#points);
  }

}
