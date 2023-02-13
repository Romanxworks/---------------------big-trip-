import AbstractView from '../framework/view/abstract-view.js';
import { SORT_TYPES } from '../const.js';

const getSortItem = (type) =>{
  const isDisabled = type === 'event' || type === 'offer'? 'disabled' :`data-sort-type="${type}"`;
  return(
    `<div class="trip-sort__item  trip-sort__item--${type}">
  <input id="sort-${type}" class="trip-sort__input visually-hidden"
   type="radio" name="trip-sort" value="sort-${type}"
   ${isDisabled} 
   ${type === SORT_TYPES[0]? 'checked' : ''}>
  <label class="trip-sort__btn" for="sort-${type}">${type}</label>
</div>`
  );} ;

const sortList = SORT_TYPES.map(getSortItem).join('');

const createSortListTemplate = () =>(
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
  ${sortList}
</form>`
);

export default class SortListView extends AbstractView{

  get template(){
    return createSortListTemplate();
  }

  setClickSortHandler = (callback) => {
    this._callback.sortClick = callback;
    const inputs = this.element.querySelectorAll('.trip-sort__input');
    inputs.forEach((input) => {
      input.addEventListener('click', this.#sortClickHandler);
    });

  };

  #sortClickHandler = (evt) => {
    this._callback.sortClick(evt.target.dataset.sortType);
  };


}
