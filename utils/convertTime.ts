
const ConvertTime = (isoDate: string) => {
    // Buat objek Date
    const date = new Date(isoDate);

    // Daftar nama bulan dalam bahasa Indonesia
    const months = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];

    // Ambil komponen waktu dalam UTC
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = months[date.getUTCMonth()];
    const year = date.getUTCFullYear();

    // Gabungkan menjadi format yang diinginkan
    const formattedDate = `${hours}:${minutes}, ${day} ${month} ${year}`;
    return formattedDate
}

export default ConvertTime