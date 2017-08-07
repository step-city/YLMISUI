
import Vue from 'vue';
import moment from 'moment';
moment.locale('zh-CN');

Vue.filter("formatDate",function(value,option) { 
         return moment(value).format(option); 
	});

