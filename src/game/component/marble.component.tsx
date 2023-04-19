import { Cell } from "../model/cell"

interface MarbleComponentArgs {
    cell: Cell
}

export const MarbleComponent = ({ cell }: MarbleComponentArgs) => {
    return (<div
        className="marbel" 
        style={{backgroundImage: getMarbleBackgroundColor(cell.marble?.getId())}}></div>)
}

const canvasMemory: Record<number, string> = {}

function getMarbleBackgroundColor(number?: number): string | undefined {
    if (!number) return undefined;

    if (canvasMemory[number]) {
        return canvasMemory[number]
    }
  
    let hue = 0;

    while (hue == 0) {
        hue = Math.round((number / 1000) * 360);
    }
  
    const canvas = document.createElement('canvas');
    canvas.width = 100;
    canvas.height = 1;
    const ctx = canvas.getContext('2d')!;
    
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    
    // Add color stops to the gradient
    gradient.addColorStop(0, `hsl(${hue}, 50%, 30%)`);
    gradient.addColorStop(0.3, `hsl(${hue}, 90%, 60%)`);
    gradient.addColorStop(0.5, `hsl(${hue}, 70%, 80%)`);
    gradient.addColorStop(0.7, `hsl(${hue}, 80%, 60%)`);
    gradient.addColorStop(1, `hsl(${hue}, 50%, 30%)`);
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  
    canvasMemory[number] = `url(${canvas.toDataURL('image/png')})`;

    return canvasMemory[number]
}