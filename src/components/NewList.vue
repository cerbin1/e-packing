<template>
  <div class="col-md-12">
    <div class="card card-container">
        <form name="form">
            <div class="form-row">
                    <div class="form-group">
                        <label for="dfrom">Start date</label>
                        <b-form-datepicker v-model="list.dfrom" :min="min" :max="max" locale="en"></b-form-datepicker>
                    </div>
						<div class="form-group">
							<label for="dto">End date</label>
							<b-form-datepicker v-model="list.dto" :min="min" :max="max" locale="en"></b-form-datepicker>
						</div>
            <div class="form-group">
                <label for="mountains"></label>
                <input 
                    type="checkbox" 
                    v-model="form.terms">
                    Mountain trip
            </div>
            <div class="form-group">
                <label for="mountains"></label>
                <input 
                    type="checkbox" 
                    v-model="form.terms">
                    Beach/swimming pool
            </div>
        </form>
    </div>
  </div>
</template>


<script>

import List from '../models/list';

export default {
  name: 'List',
  data() {
    return {
      list: new List('', '', ''),
    };
  },
}

/*export default { //?
    data() {
      const now = new Date()
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      // from today
      const minDate = new Date(today)
      // to 1 month later
      const maxDate = new Date(today)
      maxDate.setMonth(maxDate.getMonth() + 1)
      return {
        value: '',
        min: minDate,
        max: maxDate
      }
    }
  };
  */

</script>

<style>
    .center {
        width: 50%;
        margin: 0 auto;
    }
</style>