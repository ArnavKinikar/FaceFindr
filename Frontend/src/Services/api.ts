// const API_BASE_URL = '/api'; // Placeholder, will likely need configuration

export const uploadFile = async (file: File): Promise<any> => {
    const formData = new FormData();
    formData.append('file', file);

    // Mock upload for frontend demo
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Mock upload complete');
            resolve({ success: true, url: URL.createObjectURL(file) });
        }, 1500);
    });

    // try {
    //     const response = await fetch(`${API_BASE_URL}/upload`, {
    //         method: 'POST',
    //         body: formData,
    //     });

    //     if (!response.ok) {
    //         throw new Error(`Upload failed: ${response.statusText}`);
    //     }

    //     return await response.json();
    // } catch (error) {
    //     console.error('Error uploading file:', error);
    //     throw error;
    // }
};

export interface Photo {
    id: number;
    src: string;
    title: string;
    height: string;
}

const MOCK_YOUR_PHOTOS: Photo[] = [
    { id: 1, src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCg_Ns3CUoqD-t7HpwQVTTV14IZ9oPqN95vtAN6_n4Id2OXE_Rd65C_gGoi6AUm3IQ8mygjVUHPaV60-F4QjbsvDAJOq2gzs6mzXiM5MTzRSeN8KtihS8rpV7psm6Bvw7LtzSewAPWhRlxliK4CEJw6aIDIzef8RDK5aCIPyy61QBQunHNqUjJLnvI5Rdqw7hrZZy_NQI9c3MHQmlvjRmRTuNagB3LROZV-uorcsEUApWVQSl3uiLbXEy1SCb_d5RbZr7NmHzuMMuw", title: "alps_adventure.jpg", height: 'auto' },
    { id: 2, src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBLm5j1r94BO6rOsuAKBb-Ukl5STYCSzJft0_82Sp8_NZ1KJsRO-9xImuvrlMRkH_HnVP4-jHTFPEhTyG_X9UbcYhUbNcWIsEFPDHfVKIRULcV1_qs0XR4d1JWPfC5hEcEPYynZOpln0TSVA-OLuGRxoz_GLPpmwAW54haFfvILPytlM4_aVszd6TQ0BaGy2763JSxVXTrr60Tz2UuGl_v76zis2-D2y4Xz1LtA69mgiqeDCWHk3mp51tpKljs3RSxoNU4k-QLo2kw", title: "office_minimal.jpg", height: 'auto' },
    { id: 3, src: "https://lh3.googleusercontent.com/aida-public/AB6AXuC3CK2Ug4a-hl2O78PcgGU8lCtLPpBlVBlvUBcyU_7M7aeMFksLPZbPGOmFgVGqdsMMGfErn0LMg-o_fDeG9TqjzpDrLyZheO0RgMM24sgS4eEtHK1LuqIOzaofQTKxLszY86WN_-8nGOd-u0iT7FcWQNFYAFCTbBsV6EtPcTBAtrChpGjNu4l4VF0MYCvu1UHg8j5gg4GJ8j5ziluu_ggYxGZQfZTmrank1NQiSxkv2QqPfAXQipj9Zg2CFABCob3gq1jS2Y0CG1E", title: "ocean_breeze.jpg", height: '400px' },
];

const MOCK_ALL_PHOTOS: Photo[] = [
    { id: 101, src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAxUMkUcBq0kN0YcGLHvRk-yFPPk0CnJZNj4BvZTX5RhXYzseWg9zKbyU_G_chEbLDnFXk2cKtimjeC43DYYOgrg1vXTMiSPCF8vSwAl0ySb4DxHYDUOd3FtCMFxqubGQML3OASIEN2FteXLrsIVAGqY_GuTtm715LFzphfm5Bwrt-rwsNKdGD6xtQnBt447MO_9mkuQ0icohKliSxbBARZaD9OvTwqPVwWcRpKNBxVaWsbAJ5QhBZkKXrOIItz83g9qoYGRi8OnQM", title: "tokyo_nights.jpg", height: 'auto' },
    { id: 102, src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBImr18YVLwZ4nRC6366V5pIS4hDfvkr-fan-oL_Oj_IQT7i3no7GKGwfGdZLu_u9P5Ms00BSjX6mRaq0Pwwpsdw7SwcmaouByVjBdEAKLMY04MAlyO7HaEExJKX8Iy_OPA3X_DBweqEjjcgFWg_xInRCQIYNeZ6vYX53wSRknFr1_qWyphHzfsV58qoWll9bM2M4RuOsuN-W1ajF_ZOQqqVmzbte_JL0ZSvw8Z9gQuNBMmeQLmC188ziX7PtR7Hoz0pgH929jjmfA", title: "deep_forest.jpg", height: 'auto' },
    { id: 103, src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAdeN5e3rZUmf_Mjc6GaPdt7CU4KiycnL0x-tTxNXkua7cF_DRtKet0u1nkg9LNl1cy8sdAE7s95PJ0_C22HAHOPmrixHgDIlmfyEcozggiDbfaJMiwkSshPYS2W_WrBvHdrPWMdlZhow4X1FGt8e-_Saqkk6FLQUibVeomezDjFsXIwdLLnGwYboHd5h_eHKnYja0lAtd8_CA7yrcBeqAUM5VULBk2v1lau_QXiMue8OT3jxCjwwpaqqsRhQytvdHasoJlDXLIVaY", title: "sahara_gold.jpg", height: 'auto' },
    { id: 104, src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCcxXKOWbDFmolBk1ra9OqDhY7wNbsEIki-twtTxNXkua7cF_DRtKet0u1nkg9LNl1cy8sdAE7s95PJ0_C22HAHOPmrixHgDIlmfyEcozggiDbfaJMiwkSshPYS2W_WrBvHdrPWMdlZhow4X1FGt8e-_Saqkk6FLQUibVeomezDjFsXIwdLLnGwYboHd5h_eHKnYja0lAtd8_CA7yrcBeqAUM5VULBk2v1lau_QXiMue8OT3jxCjwwpaqqsRhQytvdHasoJlDXLIVaY", title: "editorial_shoot.jpg", height: '350px' },
    { id: 105, src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCuMc5hCNRhP60-gy9ARwKum_O6dIjqlMnGG_Fjlv49reL9VqXlQ6u6N1pHSt1_gJyaYIXL7TPk2-0mCa_JGHXQ6N26Rjs9g-qeLMsBnbrvqLsXY0C2mj6CKK_gR06RFMRky6MfZqm00ingh4kmbPpB5OKYkc3Fz2AQuRefbWDdiNpmTDw0Odx8ECJ45CZ4S4dHu38iupE99QVFbUK7LPmlMrNdnmwa_TOX8uMDUBnOvy9o7p8tTuB3kXal8NBJkP8D_82n6P8O4qo", title: "san_fran_fog.jpg", height: 'auto' },
];

export const fetchYourPhotos = async (): Promise<Photo[]> => {
    return Promise.resolve(MOCK_YOUR_PHOTOS);
};

export const fetchAllPhotos = async (): Promise<Photo[]> => {
    return Promise.resolve(MOCK_ALL_PHOTOS);
};
