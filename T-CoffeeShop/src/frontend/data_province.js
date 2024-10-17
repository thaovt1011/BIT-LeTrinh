export const fetchProvinces = async () => {
    const response = await fetch("https://zolachat.io.vn/bit-unikary/api/v1/location/get-all");
    return response.json();
};

export const fetchDistrictsByProvince = async (provinceCode) => {
    const response = await fetch(`https://zolachat.io.vn/bit-unikary/api/v1/location/get-districts-by-province-code?provinceCode=${provinceCode}`);
    return response.json();
};

export const fetchWardsByDistrict = async (districtCode,provinceCode) => {
    const response = await fetch(`https://zolachat.io.vn/bit-unikary/api/v1/location/get-wards-by-district-code?provinceCode=${provinceCode}&districtCode=${districtCode}`);
    return response.json();
};