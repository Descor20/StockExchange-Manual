export const getBourseIndex = async (): Promise<Response> => {
    const paris_bourse : string = "https://www.info-financiere.gouv.fr/api/explore/v2.0/";
    return await fetch(paris_bourse + "/catalog/datasets");
}