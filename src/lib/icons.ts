export const renderIcon = (icon: any) => {
    let svgElements = '';

    icon.forEach(([tag, attrs]) => {
        svgElements += `<${tag} ${Object.entries(attrs).map(([key, value]) => `${key}="${value}"`).join(' ')} />`;
    });

    return svgElements;
}