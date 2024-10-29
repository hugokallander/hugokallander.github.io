<script>
</script>

<style lang="postcss">
    .small-caps {
        font-variant-caps: small-caps;
    }
</style>

<div class="bg-gray-400 p-10 [&_*]:font-frank-ruhl-libre small-caps">
    <div class="bg-white p-8 max-w-2xl mx-auto border border-gray-300 rounded-lg shadow-lg">
        <div class="text-center mb-8">
            <h1 class="text-xl font-semibold small-caps">ENSKEDEDALEN SANITARIUM</h1>
            <h2 class="text-lg">PATIENTINSKICKNINGSFORMULÄR</h2>
        </div>

        <form class="space-y-6">
            <div class="grid grid-cols-2 gap-4">
                <label>
                    Namn
                    <input type="text" value="Erik Johansson" class="border border-gray-400 w-full p-2" readonly />
                </label>
                <label>
                    Inskrivningsdatum
                    <input type="date" value="2024-10-29" class="border border-gray-400 w-full p-2" readonly />
                </label>
                <label>
                    Födelsedatum
                    <input type="date" value="1985-04-15" class="border border-gray-400 w-full p-2" readonly />
                </label>
                <label>
                    Kön
                    <input type="text" value="Man" class="border border-gray-400 w-full p-2" readonly />
                </label>
                <label>
                    Civilstånd
                    <input type="text" value="Gift" class="border border-gray-400 w-full p-2" readonly />
                </label>
                <label>
                    Barn
                    <input type="number" value="2" class="border border-gray-400 w-full p-2" readonly />
                </label>
                <label class="col-span-2">
                    Bostad
                    <input type="text" value="Skövde, Sverige" class="border border-gray-400 w-full p-2" readonly />
                </label>
                <label>
                    Yrke
                    <input type="text" value="Ingenjör" class="border border-gray-400 w-full p-2" readonly />
                </label>
                <label>
                    Födelsetal
                    <input type="text" value="Skövde" class="border border-gray-400 w-full p-2" readonly />
                </label>
                <label class="col-span-2">
                    Religion
                    <input type="text" value="Kristen" class="border border-gray-400 w-full p-2" readonly />
                </label>
            </div>

            <h3 class="text-lg font-semibold">ADMINISTRATION</h3>
            <div class="grid grid-cols-2 gap-4">
                <label>
                    Närstående/Vårdnadshavare
                    <input type="text" value="Anna Johansson" class="border border-gray-400 w-full p-2" readonly />
                </label>
                <label>
                    Tel.
                    <input type="tel" value="?????" class="border border-red-400 w-full p-2" />
                </label>
                <label>
                    Personlig Läkare
                    <input type="text" value="Dr. Lars Eriksson" class="border border-gray-400 w-full p-2" readonly />
                </label>
                <label>
                    Tel.
                    <input type="tel" value="?????" class="border border-red-400 w-full p-2" />
                </label>
                <label>
                    Ombud (Om något)
                    <input type="text" value="Ingen" class="border border-gray-400 w-full p-2" readonly />
                </label>
                <label>
                    Tel.
                    <input type="tel" value="-" class="border border-gray-400 w-full p-2" readonly />
                </label>
                <label>
                    Registreringsnummer
                    <input type="text" value="123456-7890" class="border border-gray-400 w-full p-2" readonly />
                </label>
                <label>
                    Avdelning
                    <input type="text" value="Avdelning A" class="border border-gray-400 w-full p-2" readonly />
                </label>
                <label>
                    Säng
                    <input type="text" value="Säng 5" class="border border-gray-400 w-full p-2" readonly />
                </label>
                <label class="col-span-2">
                    Vårdnotat
                    <input type="text" value="Inga anmärkningar" class="border border-gray-400 w-full p-2" readonly />
                </label>
            </div>

            <h3 class="text-lg font-semibold">HISTORIK</h3>
            <div class="space-y-4">
                <div>
                    <h4 class="block font-semibold">Inskrivningssätt</h4>
                    <div class="flex gap-4">
                        <label>
                            <input type="radio" name="admission_mode" value="Voluntary" class="mr-2" checked disabled />
                            Frivillig
                        </label>
                        <label>
                            <input type="radio" name="admission_mode" value="Certified" class="mr-2" disabled />
                            Certifierad
                        </label>
                        <label>
                            <input type="radio" name="admission_mode" value="Criminal" class="mr-2" disabled />
                            Kriminalvården
                        </label>
                    </div>
                </div>

                <label>
                    Överflyttning från
                    <input type="text" value="Ingen" class="border border-gray-400 w-full p-2" readonly />
                </label>

                <div class="grid grid-cols-2 gap-4">
                    <label>
                        Puls
                        <input type="text" value="72" class="border border-gray-400 w-full p-2" readonly />
                    </label>
                    <label>
                        Blodtryck
                        <input type="text" value="120/80" class="border border-gray-400 w-full p-2" readonly />
                    </label>
                    <label>
                        Andning
                        <input type="text" value="16" class="border border-gray-400 w-full p-2" readonly />
                    </label>
                    <label>
                        Temperatur
                        <input type="text" value="37.0" class="border border-gray-400 w-full p-2" readonly />
                    </label>
                </div>

                <label>
                    Mentalt tillstånd vid inskrivning
                    <textarea class="border border-gray-400 w-full p-2" readonly>Patienten uppvisar inga tecken på oro.</textarea>
                </label>
                <label>
                    Antagna orsaker - Predisponerande
                    <textarea class="border border-gray-400 w-full p-2" readonly>Ingen känd predisposition.</textarea>
                </label>
                <label>
                    Utlösande
                    <textarea class="border border-gray-400 w-full p-2" readonly>Stress och arbetsbelastning.</textarea>
                </label>
                <label>
                    Fysisk kondition
                    <textarea class="border border-gray-400 w-full p-2" readonly>Stabil och normal.</textarea>
                </label>
                <label>
                    Särskilda omständigheter
                    <textarea class="border border-gray-400 w-full p-2" readonly>Ingen särskild omständighet att notera.</textarea>
                </label>

                <div class="grid grid-cols-2 gap-4">
                    <label>
                        Datum för tidigare inskrivningar
                        <input type="text" value="2020-01-10, 2022-03-15" class="border border-gray-400 w-full p-2" readonly />
                    </label>
                    <label>
                        och utskrivningar
                        <input type="text" value="2020-01-20, 2022-03-25" class="border border-gray-400 w-full p-2" readonly />
                    </label>
                </div>
            </div>
        </form>
    </div>
</div>