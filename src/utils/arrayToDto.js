/**
 * 
 * @param {arrya_a_transformar} array 
 * @param {DTO_a_usar} DTO 
 * @returns array con los objetos pasados a dto
 */
export default function transformarEnArrayDeDto(array, DTO) {
    const items = []
    array.map((p) => items.push(new DTO(p)))
    return items
};