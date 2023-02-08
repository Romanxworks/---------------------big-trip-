import AbstractView from '../framework/view/abstract-view.js';

const getFilterItem = ({name, count}, isChecked) => (
  ` <div class="trip-filters__filter">
  <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${name}" ${isChecked? 'checked': ''}>
  <label class="trip-filters__filter-label" for="filter-${name}">${name}-${count}</label>
</div>`
);

const createFilterListTemplate = (filters) =>{
  const filtersList = filters.map((filter, index)=> getFilterItem(filter, index===0)).join('');
  return(
    `<form class="trip-filters" action="#" method="get">
    ${filtersList}
  <button class="visually-hidden" type="submit">Accept filter</button>
</form>`
  );};

export default class FilterListView extends AbstractView{
  #filters = null;

  constructor(filters){
    super();
    this.#filters = filters;
  }

  get template(){
    return createFilterListTemplate(this.#filters);
  }

}
