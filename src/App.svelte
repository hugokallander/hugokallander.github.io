<script>
    // Any form handling or state management can be added here.
</script>

<div class="p-8 max-w-2xl mx-auto border border-gray-300 rounded-lg shadow-lg">
    <div class="text-center mb-8">
        <h1 class="text-xl font-semibold">ARKHAM SANITARIUM</h1>
        <h2 class="text-lg">PATIENT ADMISSION FORM</h2>
    </div>

    <form class="space-y-6">
        <!-- Basic Information -->
        <div class="grid grid-cols-2 gap-4">
            <label>
                Name
                <input type="text" class="border border-gray-400 rounded w-full p-2" />
            </label>
            <label>
                Date of Admission
                <input type="date" class="border border-gray-400 rounded w-full p-2" />
            </label>
            <label>
                Date of Birth
                <input type="date" class="border border-gray-400 rounded w-full p-2" />
            </label>
            <label>
                Sex
                <input type="text" class="border border-gray-400 rounded w-full p-2" />
            </label>
            <label>
                Marital Status
                <input type="text" class="border border-gray-400 rounded w-full p-2" />
            </label>
            <label>
                Children
                <input type="number" class="border border-gray-400 rounded w-full p-2" />
            </label>
            <label class="col-span-2">
                Residence
                <input type="text" class="border border-gray-400 rounded w-full p-2" />
            </label>
            <label>
                Occupation
                <input type="text" class="border border-gray-400 rounded w-full p-2" />
            </label>
            <label>
                Nativity
                <input type="text" class="border border-gray-400 rounded w-full p-2" />
            </label>
            <label class="col-span-2">
                Religion
                <input type="text" class="border border-gray-400 rounded w-full p-2" />
            </label>
        </div>

        <!-- Administration Section -->
        <h3 class="text-lg font-semibold">ADMINISTRATION</h3>
        <div class="grid grid-cols-2 gap-4">
            <label>
                Next of Kin/Guardian
                <input type="text" class="border border-gray-400 rounded w-full p-2" />
            </label>
            <label>
                Tel.
                <input type="tel" class="border border-gray-400 rounded w-full p-2" />
            </label>
            <label>
                Personal Physician
                <input type="text" class="border border-gray-400 rounded w-full p-2" />
            </label>
            <label>
                Tel.
                <input type="tel" class="border border-gray-400 rounded w-full p-2" />
            </label>
            <label>
                Agent (If any)
                <input type="text" class="border border-gray-400 rounded w-full p-2" />
            </label>
            <label>
                Tel.
                <input type="tel" class="border border-gray-400 rounded w-full p-2" />
            </label>
            <label>
                Register Number
                <input type="text" class="border border-gray-400 rounded w-full p-2" />
            </label>
            <label>
                Ward
                <input type="text" class="border border-gray-400 rounded w-full p-2" />
            </label>
            <label>
                Bed
                <input type="text" class="border border-gray-400 rounded w-full p-2" />
            </label>
            <label class="col-span-2">
                Care Note
                <input type="text" class="border border-gray-400 rounded w-full p-2" />
            </label>
        </div>

        <!-- History Section -->
        <h3 class="text-lg font-semibold">HISTORY</h3>
        <div class="space-y-4">
            <div>
                <label class="block font-semibold">Mode of Admission</label>
                <div class="flex gap-4">
                    <label>
                        <input type="radio" name="admission_mode" value="Voluntary" class="mr-2" />
                        Voluntary
                    </label>
                    <label>
                        <input type="radio" name="admission_mode" value="Certified" class="mr-2" />
                        Certified
                    </label>
                    <label>
                        <input type="radio" name="admission_mode" value="Criminal" class="mr-2" />
                        Criminal
                    </label>
                </div>
            </div>

            <label>
                Transfer from
                <input type="text" class="border border-gray-400 rounded w-full p-2" />
            </label>

            <!-- Vital Signs -->
            <div class="grid grid-cols-2 gap-4">
                <label>
                    Pulse
                    <input type="text" class="border border-gray-400 rounded w-full p-2" />
                </label>
                <label>
                    Blood Pressure
                    <input type="text" class="border border-gray-400 rounded w-full p-2" />
                </label>
                <label>
                    Respiration
                    <input type="text" class="border border-gray-400 rounded w-full p-2" />
                </label>
                <label>
                    Temperature
                    <input type="text" class="border border-gray-400 rounded w-full p-2" />
                </label>
            </div>

            <label>
                Mental State on Admission
                <textarea class="border border-gray-400 rounded w-full p-2"></textarea>
            </label>
            <label>
                Supposed Causes - Predisposing
                <textarea class="border border-gray-400 rounded w-full p-2"></textarea>
            </label>
            <label>
                Exciting
                <textarea class="border border-gray-400 rounded w-full p-2"></textarea>
            </label>
            <label>
                Physical Condition
                <textarea class="border border-gray-400 rounded w-full p-2"></textarea>
            </label>
            <label>
                Special Circumstances
                <textarea class="border border-gray-400 rounded w-full p-2"></textarea>
            </label>

            <div class="grid grid-cols-2 gap-4">
                <label>
                    Dates of Previous Admissions
                    <input type="text" class="border border-gray-400 rounded w-full p-2" />
                </label>
                <label>
                    and of Discharges
                    <input type="text" class="border border-gray-400 rounded w-full p-2" />
                </label>
            </div>
        </div>
    </form>
</div>