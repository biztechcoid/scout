'use strict'

exports.date = function(data) {
  const date = new Date(data)
  const _hari = ['Minggu', 'Senin', 'Selasa',  'Rabu', 'Kamis', 'Jumat', 'Sabtu']
  const hari = _hari[date.getDay()]
  const tanggal = date.getDate()
  const _bulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
  const bulan = _bulan[date.getMonth()]
  const _tahun = date.getYear()
  const tahun = (_tahun < 1000) ? _tahun + 1900 : _tahun
  return hari + ', ' + tanggal + ' ' + bulan + ' ' + tahun
}

exports.ddmmyyyy = function(data) {
  const date = new Date(data)
  // const _hari = ['Minggu', 'Senin', 'Selasa',  'Rabu', 'Kamis', 'Jumat', 'Sabtu']
  // const hari = _hari[date.getDay()]
  const tanggal = date.getDate()
  const _bulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
  const bulan = _bulan[date.getMonth()]
  const _tahun = date.getYear()
  const tahun = (_tahun < 1000) ? _tahun + 1900 : _tahun
  return tanggal + ' ' + bulan + ' ' + tahun
}

exports.mmyyyy = function(data) {
  const date = new Date(data)
  // const _hari = ['Minggu', 'Senin', 'Selasa',  'Rabu', 'Kamis', 'Jumat', 'Sabtu']
  // const hari = _hari[date.getDay()]
  // const tanggal = date.getDate()
  const _bulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
  const bulan = _bulan[date.getMonth()]
  const _tahun = date.getYear()
  const tahun = (_tahun < 1000) ? _tahun + 1900 : _tahun
  return bulan + ' ' + tahun
}

exports.yyyy = function(data) {
  const date = new Date(data)
  // const _hari = ['Minggu', 'Senin', 'Selasa',  'Rabu', 'Kamis', 'Jumat', 'Sabtu']
  // const hari = _hari[date.getDay()]
  // const tanggal = date.getDate()
  // const _bulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
  // const bulan = _bulan[date.getMonth()]
  const _tahun = date.getYear()
  const tahun = (_tahun < 1000) ? _tahun + 1900 : _tahun
  return tahun
}