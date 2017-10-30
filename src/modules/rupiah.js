'use strict'

const rupiah = function(data) {
  var rev = parseInt(data, 10).toString().split('').reverse().join('');    
  var rev2    = '';
  for(var i = 0; i < rev.length; i++) {
    rev2  += rev[i];        if((i + 1) % 3 === 0 && i !== (rev.length - 1))
    {rev2 += '.'}    
  }    
  return 'Rp. ' + rev2.split('').reverse().join('')
};

module.exports = rupiah