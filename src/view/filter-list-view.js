import AbstractView from '../framework/view/abstract-view.js';

const getFilterItem = ({name, count}, filterType) => (
  ` <div class="trip-filters__filter">
  <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${name}" ${name === filterType? 'checked': ''}
   ${count === 0 ? 'disabled' : ''}
   >
  <label class="trip-filters__filter-label" for="filter-${name}">${name}-${count}</label>
</div>`
);

const createFilterListTemplate = (filters, filterType) =>{
  const filtersList = filters.map((filter)=> getFilterItem(filter, filterType)).join('');
  return(
    `<div class="trip-main__trip-controls  trip-controls">
      <div class="trip-controls__filters">
        <h2 class="visually-hidden">Filter events</h2>
        <form class="trip-filters" action="#" method="get">
          ${filtersList}
          <button class="visually-hidden" type="submit">Accept filter</button>
        </form>
      </div>
    </div>`
  );};

export default class FilterListView extends AbstractView{
  #filters = null;
  #filterType = null;

  constructor(filters, filterType){
    super();
    this.#filters = filters;
    this.#filterType = filterType;
  }

  get template(){
    return createFilterListTemplate(this.#filters, this.#filterType);
  }

  setFilterChangeHandler = (callback) => {
    this._callback.filterTypeChange = callback;
    const filterHandlers = this.element.querySelectorAll('input');
    filterHandlers.forEach((filterHandler) =>
      filterHandler.addEventListener('change', this.#filterTypeChangeHandler));
  };

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  };

}
