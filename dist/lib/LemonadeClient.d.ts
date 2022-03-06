import { SapphireClient } from "@sapphire/framework";
import type { InternationalizationContext } from "@sapphire/plugin-i18next";
import "@sapphire/plugin-logger/register";
import "@sapphire/plugin-i18next/register";
import "@sapphire/plugin-api/register";
export declare class LemonClient extends SapphireClient {
    /**
     *
     */
    login(token: string): Promise<string>;
    fetchLanguage: (context: InternationalizationContext) => Promise<string | undefined>;
    constructor();
}
//# sourceMappingURL=LemonadeClient.d.ts.map