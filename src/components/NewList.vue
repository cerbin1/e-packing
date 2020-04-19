<template>
  <div class="col-md-12">
    <div class="card card-container">
        <form name="form">
            <div id="app">
                <div id="dfrom">
                    <div class="center">
                        <h1>Select start date</h1>
                        <Datepicker></Datepicker>
                    </div>
                </div>
                <div id="dto">
                    <div class="center">
                        <h1>Select end date</h1>
                        <Datepicker></Datepicker>
                    </div>
                </div>
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
    import Datepicker from 'vuejs-datepicker'

    export default {
        name: 'dfrom',
        components: {
            Datepicker
        }
    }
    export default {
        name: 'dto',
        components: {
            Datepicker
        }
    }

new Vue({
  el: "#app",
  data: {
  	start: null,
    end: null,
    diff: null
  },
  
  mounted () {
  	this.start = moment();
    this.end = moment().add(7, 'days');
    
    let d = moment.duration(this.end.diff(this.start));
    
    this.diff = d.format()
    
    console.log(this.diff)
  }
})

</script>

<style>
    .center {
        width: 50%;
        margin: 0 auto;
    }
</style>