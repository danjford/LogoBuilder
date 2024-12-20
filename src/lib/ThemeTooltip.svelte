<script>
    import { AlarmClockOff } from "lucide-svelte";


    import { Tooltip, TooltipTrigger, TooltipContent } from "./components/ui/tooltip";




    let { class: className, iconClass: iconClassName = '', iconFill = 'rgba(0,0,0,0)', title, description, onclick, ...props } = $props();

</script>
<Tooltip closeDelay={0}>
    <TooltipTrigger class="p-2 group {className}" onclick={onclick}>
        <AlarmClockOff class="text-black {iconClassName} group-hover:scale-110 pointer-events-none" fill={iconFill} />
    </TooltipTrigger>
    <TooltipContent class="bg-black text-white max-w-[400px] p-4">
        <p class="font-bold">{title}</p>
        <p>{description}</p>
    </TooltipContent>
</Tooltip>