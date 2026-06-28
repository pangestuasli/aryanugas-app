import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { getCurrentUser } from '../../lib/helpers';

import { AlertContainer, useAlert } from '../../components/Alert';
import { FormModal, ConfirmDeleteModal } from '../../components/Modal';
import Input, { Textarea } from '../../components/Input';
import Select from '../../components/Select';
import { PageLoading, ButtonLoading } from '../../components/Loading';
import { formatDateTime, getStatusColor } from '../../lib/helpers';

const BookingPage = () => {
  const { alerts, removeAlert, success, error, warning } = useAlert();
  const currentUser = getCurrentUser();

  // Loading states
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isListLoading, setIsListLoading] = useState(false);

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [loading, setLoading] = useState(false);

  // Data states
  const [appointmentsData, setAppointmentsData] = useState([]);
  const [doctorsData, setDoctorsData] = useState([]);
  const [petsData, setPetsData] = useState([]);

  // Form states
  const [formData, setFormData] = useState({
    doctor_id: '',
    patient_id: '',
    appointment_date: '',
    appointment_time: '',
    notes: '',
  });

  // Fetch data on mount
  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    setIsPageLoading(true);
    try {
      // Fetch doctors, pets, and appointments in parallel
      const [doctorsRes, petsRes, appointmentsRes] = await Promise.all([
        supabase.from('doctors').select('*').eq('is_active', true).order('name'),
        supabase.from('patients').select('*').eq('owner', currentUser.username).order('name'),
        supabase.from('appointments').select(`
          *,
          doctors:doctor_id (name, specialization),
          patients:patient_id (name, type)
        `).eq('member_username', currentUser.username).order('appointment_date', { ascending: false }),
      ]);

      if (doctorsRes.error) throw doctorsRes.error;
      if (petsRes.error) throw petsRes.error;
      if (appointmentsRes.error) throw appointmentsRes.error;

      setDoctorsData(doctorsRes.data || []);
      setPetsData(petsRes.data || []);
      setAppointmentsData(appointmentsRes.data || []);
    } catch (err) {
      console.error(err);
      error('Gagal memuat data', err.message);
    } finally {
      setIsPageLoading(false);
    }
  };

  const handleAddBooking = () => {
    setFormData({
      doctor_id: '',
      patient_id: '',
      appointment_date: '',
      appointment_time: '',
      notes: '',
    });
    setIsAddModalOpen(true);
  };

  // CREATE: Add appointment to Supabase
  const handleSubmitBooking = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Combine date and time
      const appointmentDateTime = `${formData.appointment_date}T${formData.appointment_time}:00`;

      const { data, error: insertError } = await supabase
        .from('appointments')
        .insert([{
          member_username: currentUser.username,
          doctor_id: formData.doctor_id,
          patient_id: parseInt(formData.patient_id),
          appointment_date: appointmentDateTime,
          notes: formData.notes || null,
          status: 'pending',
        }])
        .select(`
          *,
          doctors:doctor_id (name, specialization),
          patients:patient_id (name, type)
        `);

      if (insertError) throw insertError;

      if (data) {
        setAppointmentsData([data[0], ...appointmentsData]);
        success('Berhasil!', 'Booking janji temu telah dibuat');
        setIsAddModalOpen(false);
      }
    } catch (err) {
      console.error(err);
      error('Gagal membuat booking', err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelClick = (booking) => {
    if (booking.status === 'completed' || booking.status === 'cancelled') {
      warning('Tidak bisa dibatalkan', 'Booking ini sudah selesai atau dibatalkan');
      return;
    }
    setSelectedBooking(booking);
    setIsCancelModalOpen(true);
  };

  // UPDATE: Cancel appointment
  const handleConfirmCancel = async () => {
    setLoading(true);
    try {
      const { data, error: updateError } = await supabase
        .from('appointments')
        .update({ status: 'cancelled' })
        .eq('id', selectedBooking.id)
        .select(`
          *,
          doctors:doctor_id (name, specialization),
          patients:patient_id (name, type)
        `);

      if (updateError) throw updateError;

      if (data) {
        setAppointmentsData(appointmentsData.map(a =>
          a.id === selectedBooking.id ? data[0] : a
        ));
        success('Berhasil!', 'Booking telah dibatalkan');
        setIsCancelModalOpen(false);
      }
    } catch (err) {
      console.error(err);
      error('Gagal membatalkan booking', err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchInitialData();
    success('Sukses', 'Data berhasil dimuat ulang');
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Prepare options for selects
  const doctorOptions = doctorsData.map(doc => ({
    value: doc.id,
    label: `${doc.name} - ${doc.specialization || 'Umum'}`,
  }));

  const petOptions = petsData.map(pet => ({
    value: String(pet.id),
    label: `${pet.name} (${pet.type || 'Hewan'})`,
  }));

  // Status labels
  const statusLabels = {
    pending: 'Menunggu',
    confirmed: 'Dikonfirmasi',
    completed: 'Selesai',
    cancelled: 'Dibatalkan',
  };

  // Separate upcoming and past appointments
  const upcomingAppointments = appointmentsData.filter(a =>
    a.status === 'pending' || a.status === 'confirmed'
  );
  const pastAppointments = appointmentsData.filter(a =>
    a.status === 'completed' || a.status === 'cancelled'
  );

  if (isPageLoading) {
    return <PageLoading />;
  }

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8">
      <AlertContainer alerts={alerts} onRemove={removeAlert} position="top-right" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <p className="text-sm text-[#6B6357]">Kelola jadwal kunjungan</p>
          <h1
            className="text-2xl font-bold text-[#1F3A2E]"
            style={{ fontFamily: "'Fraunces', Georgia, serif" }}
          >
            Booking Janji Temu
          </h1>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleRefresh}
            disabled={isListLoading}
            className="border border-[#1F3A2E]/10 bg-white hover:bg-[#F8F4EC] text-[#1F3A2E] px-4 py-2.5 rounded-xl font-semibold transition-all text-sm shadow-sm"
          >
            Refresh
          </button>
          <button
            onClick={handleAddBooking}
            disabled={petsData.length === 0}
            className="bg-[#2F6B4C] hover:bg-[#1F3A2E] text-white px-5 py-2.5 rounded-xl font-semibold shadow-sm transition-all flex items-center gap-2 text-sm disabled:opacity-50"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
            </svg>
            Booking Baru
          </button>
        </div>
      </div>

      {/* Info: No pets registered */}
      {petsData.length === 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-sm text-amber-800">
          <p className="font-semibold">Belum ada anabul terdaftar</p>
          <p className="mt-1">Silakan daftarkan anabul Anda terlebih dahulu di klinik untuk bisa membuat booking.</p>
        </div>
      )}

      {/* Upcoming Appointments */}
      <div className="bg-white rounded-2xl border border-[#1F3A2E]/10 p-6 mb-6">
        <h2 className="font-bold text-[#1F3A2E] mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
          Booking Aktif
        </h2>

        {upcomingAppointments.length === 0 ? (
          <div className="bg-[#F8F4EC] rounded-xl p-6 text-center text-sm text-[#6B6357]">
            Belum ada booking aktif. Klik "Booking Baru" untuk membuat janji temu.
          </div>
        ) : (
          <div className="space-y-3">
            {upcomingAppointments.map((booking) => (
              <div
                key={booking.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#1F3A2E]/5 last:border-0 pb-3 last:pb-0 gap-3"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-sm text-[#1F3A2E]">
                      {booking.doctors?.name || 'Dokter'}
                    </p>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getStatusColor(booking.status)}`}>
                      {statusLabels[booking.status]}
                    </span>
                  </div>
                  <p className="text-xs text-[#6B6357]">
                    {booking.patients?.name || 'Pasien'} • {booking.doctors?.specialization || ''}
                  </p>
                  <p className="text-xs text-[#6B6357] mt-0.5">
                    📅 {formatDateTime(booking.appointment_date)}
                  </p>
                  {booking.notes && (
                    <p className="text-xs text-[#6B6357] mt-1 italic">"{booking.notes}"</p>
                  )}
                </div>
                <button
                  onClick={() => handleCancelClick(booking)}
                  className="text-xs font-bold text-red-500 hover:text-red-700 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors self-start"
                >
                  Batalkan
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Past Appointments */}
      {pastAppointments.length > 0 && (
        <div className="bg-white rounded-2xl border border-[#1F3A2E]/10 p-6">
          <h2 className="font-bold text-[#1F3A2E] mb-4 text-sm opacity-70">
            Riwayat Booking
          </h2>
          <div className="space-y-3">
            {pastAppointments.map((booking) => (
              <div
                key={booking.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#1F3A2E]/5 last:border-0 pb-3 last:pb-0 gap-3 opacity-60"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-sm text-[#1F3A2E]">
                      {booking.doctors?.name || 'Dokter'}
                    </p>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getStatusColor(booking.status)}`}>
                      {statusLabels[booking.status]}
                    </span>
                  </div>
                  <p className="text-xs text-[#6B6357]">
                    {booking.patients?.name || 'Pasien'} • {formatDateTime(booking.appointment_date)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Booking Form Modal */}
      <FormModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Booking Janji Temu Baru"
        onSubmit={handleSubmitBooking}
        loading={loading}
        submitText="Buat Booking"
      >
        <div className="space-y-4">
          <Select
            label="Pilih Dokter"
            name="doctor_id"
            value={formData.doctor_id}
            onChange={handleFormChange}
            options={doctorOptions}
            placeholder="Pilih dokter..."
            required
          />
          <Select
            label="Pilih Anabul"
            name="patient_id"
            value={formData.patient_id}
            onChange={handleFormChange}
            options={petOptions}
            placeholder="Pilih hewan..."
            required
          />
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Tanggal"
              name="appointment_date"
              type="date"
              value={formData.appointment_date}
              onChange={handleFormChange}
              required
            />
            <Input
              label="Waktu"
              name="appointment_time"
              type="time"
              value={formData.appointment_time}
              onChange={handleFormChange}
              required
            />
          </div>
          <Textarea
            label="Catatan (Opsional)"
            name="notes"
            value={formData.notes}
            onChange={handleFormChange}
            placeholder="Keluhan atau catatan khusus..."
            rows={3}
          />
        </div>
      </FormModal>

      {/* Cancel Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        onConfirm={handleConfirmCancel}
        itemName="booking ini"
        loading={loading}
      />
    </div>
  );
};

export default BookingPage;
