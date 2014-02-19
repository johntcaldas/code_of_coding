var SystemSummary = Backbone.Model.extend({
   urlRoot: 'http://localhost:5000/system/summary',
   defaults: {
       memory_info: {
           buffers_mb: 0,
           cached_mb: 0,
           free_mb: 0,
           free_plus_cached_mb: 0,
           total_mb: 0,
           used_minus_cached_mb: 0
       },
       up_time: {
           idle_seconds: 0,
           uptime_seconds: 0
       }
   }
});