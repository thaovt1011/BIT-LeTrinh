export const fetchProvinces = async () => {
    const response = await fetch('https://provinces.open-api.vn/api/p/');
    return response.json();
};

export const fetchProvince = async (provinceCode) => {
    const response = await fetch(`https://provinces.open-api.vn/api/p/${provinceCode}`);
    return response.json();
};

export const fetchDistrictsByProvince = async (provinceCode) => {
    const response = await fetch(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`);
    return response.json();
};

export const fetchDistrict = async (districtCode) => {
    const response = await fetch(`https://provinces.open-api.vn/api/d/${districtCode}`);
    return response.json();
};


export const fetchWardsByDistrict = async (districtCode) => {
    const response = await fetch(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`);
    return response.json();
};

export const fetchWard = async (wardtCode) => {
    const response = await fetch(`https://provinces.open-api.vn/api/w/${wardtCode}`);
    return response.json();
};


 