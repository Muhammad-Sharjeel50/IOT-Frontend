

const AddCards = () => {
  return (
    <>
  <div className="space-y-1 w-full ">
            <div className=" flex flex-col gap-4 md:flex-row">
              <AddCards
                icon={<PiWaveSineFill />}
                title="Phase 1"
                bgColor="#62b2cd"
              />

              <div className="bg-white xl:h-32 h-24 md:w-[300px]  sm:w-auto rounded grid grid-cols-1 gap-2 mb-1">
                <ReactApexChart
                  options={options}
                  series={[phase1voltage]}
                  type="radialBar"
                />
              </div>
              <AddCards
                icon={<PiWaveSineFill />}
                title="Current"
                count={phase1current}
                unit="A"
              />
              <AddCards
                icon={<SiPowerbi />}
                title="Power"
                count={phase1power}
                unit="Kw"
              />
              <AddCards
                icon={<BsLightningCharge />}
                title="Energy"
                count={phase1energy}
                unit="kw/h"
              />
              <AddCards
                icon={<GiLightningFrequency />}
                title="Frequency"
                count={phase1frequency}
                unit="Hz"
              />

              <AddCards
                icon={<TbGeometry />}
                title="Power_Factor	"
                count={phase1power_factor}
                unit="Pf"
              />
            </div>
            <div className=" flex flex-col gap-4 md:flex-row ">
              <AddCards
                icon={<PiWaveSineFill />}
                title="Phase 2"
                bgColor="#62b2cd"
              />
              <div className="bg-white xl:h-32 h-24 md:w-[300px] sm:w-auto rounded grid grid-cols-1 gap-2 mb-1">
                <ReactApexChart
                  options={options}
                  series={[phase2voltage]}
                  type="radialBar"
                />
              </div>

              <AddCards
                icon={<PiWaveSineFill />}
                title="Current"
                count={phase2current}
                unit="A"
              />
              <AddCards
                icon={<SiPowerbi />}
                title="Power"
                count={phase2power}
                unit="Kw"
              />
              <AddCards
                icon={<BsLightningCharge />}
                title="Energy"
                count={phase2energy}
                unit="kw/h"
              />
              <AddCards
                icon={<GiLightningFrequency />}
                title="Frequency"
                count={phase2frequency}
                unit="Hz"
              />

              <AddCards
                icon={<TbGeometry />}
                title="Power_Factor"
                count={phase2power_factor}
                unit="Pf"
              />
            </div>
            <div className=" flex flex-col gap-4 md:flex-row">
              <AddCards
                icon={<PiWaveSineFill />}
                title="Phase 3"
                bgColor="#62b2cd"
              />
              <div className="bg-white xl:h-32 h-24 xl:w-[300px] md:w-auto rounded grid grid-cols-1 gap-2 mb-1">
                <ReactApexChart
                  options={options}
                  series={[phase3voltage]}
                  type="radialBar"
                />
              </div>
              <AddCards
                icon={<PiWaveSineFill />}
                title="Current"
                count={phase3current}
                unit="A"
              />
              <AddCards
                icon={<SiPowerbi />}
                title="Power"
                count={phase3power}
                unit="Kw"
              />
              <AddCards
                icon={<BsLightningCharge />}
                title="Energy"
                count={phase3energy}
                unit="kw/h"
              />
              <AddCards
                icon={<GiLightningFrequency />}
                title="Frequency"
                count={phase3frequency}
                unit="Hz"
              />

              <AddCards
                icon={<TbGeometry />}
                title="Power_Factor"
                count={phase3power_factor}
                unit="Pf"
              />
            </div>
            <div className="flex flex-col gap-4  md:flex-row">
              <AddCards
                icon={<PiWaveSineFill />}
                title="Three Phase"
                bgColor="#62b2cd"
              />
              <div className="bg-white xl:h-32 h-24 xl:w-[300px] md:w-auto rounded grid grid-cols-1 gap-2 mb-1">
                <ReactApexChart
                  options={options}
                  series={[threephasevoltage]}
                  type="radialBar"
                />
              </div>

              <AddCards
                icon={<PiWaveSineFill />}
                title="Current"
                count={phase1current}
                unit="A"
              />
              <AddCards
                icon={<SiPowerbi />}
                title="Active-Power"
                count={phase1power}
                unit="Kw"
              />

              {/* <div className="flex space-x-4"> */}


              <AddCards
                icon={<BsLightningCharge />}
                title="Energy"
                count={phase1energy}
                unit="kw/h"
              />
              <div className="grid grid-cols-2 gap-3 w-[17rem]">
                <div className="grid gap-3">
                  <SplitCards
                    icon={<BsLightningCharge />}
                    title="Apparent-Power"
                    count={apparent}
                    unit="KVA"
                  />

                  <SplitCards
                    icon={<BsLightningCharge />}
                    title="Frequency"
                    count={frequency}
                    unit="Hz"
                  />
                </div>
                <div className="grid gap-3">
                  <SplitCards
                    icon={<BsLightningCharge />}
                    title="Reactive-Power"
                    count={reactive}
                    unit="KVAR"
                  />
                  <SplitCards
                    icon={<BsLightningCharge />}
                    title="Power-Factor"
                    count={powerfactor}
                    unit="pf"
                  />
                </div>
              </div>
              {/* </div> */}

              {/* <AddCards
                icon={<GiLightningFrequency />}
                title="frequency"
                count={phase1frequency}
          unit="Hz"
              /> */}
              {/* 
              <AddCards
                icon={<TbGeometry />}
                title="power_factor	"
                count={phase1power_factor}
          unit="Pf"
              /> */}
            </div>
          </div>
    </>

  );
};

export default AddCards;
<div className="w-full h-full p-4 flex flex-col gap-4 overflow-scroll">


<div class="flex-grow bg-gray-100">
  <div className="xl:grid md:grid none w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
    <div class="space-y-4">
      <AddCards
        icon={<PiWaveSineFill />}
        title="Phase 1"
        bgColor="xl:bg-[#ffffff]"
        smBgColor="bg-[#4B9CD3]"
      />
      <AddCards
        icon={<PiWaveSineFill />}
        title="Phase 2"
        bgColor="xl:bg-[#ffffff]"
        smBgColor="bg-[#118A99]"

      />
      <AddCards
        icon={<PiWaveSineFill />}
        title="Phase 3"
        bgColor="xl:bg-[#ffffff]"
        smBgColor="bg-[#FFF176]"

      />
      <AddCards
        icon={<PiWaveSineFill />}
        title="Three Phase"
        bgColor="xl:bg-[#ffffff]"
        smBgColor="bg-[#BA6C86]"

      />
    </div>
    <div class="col-span-2 space-y-4">
      <div style={{ background: '#C62828', height: '132px', borderRadius: '0.5rem', overflow: 'hidden' }}>
        <ReactApexChart
          options={options}
          series={[phase1voltage]}
          type="radialBar"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      <div style={{ background: '#78A845', height: '132px', borderRadius: '0.5rem', overflow: 'hidden' }}>
        <ReactApexChart
          options={options}
          series={[phase2voltage]}
          type="radialBar"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      <div style={{ background: '#FFF176', height: '132px', borderRadius: '0.5rem', overflow: 'hidden' }}>
        <ReactApexChart
          options={options}
          series={[phase3voltage]}
          type="radialBar"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      <div style={{ background: '#BA6C86', height: '132px', borderRadius: '0.5rem', overflow: 'hidden' }}>
        <ReactApexChart
          options={options}
          series={[threephasevoltage]}
          type="radialBar"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* <ReactApexChart
            options={options}
            series={[phase1voltage]}
            type="radialBar"
            style={{ background: '#fff', height: "110px", borderRadious: "0.5rem" }}
          />
       
          <ReactApexChart
            options={options}
            series={[phase2voltage]}
            type="radialBar"
            style={{ background: '#fff', height: "110px", borderRadious: "0.5rem" }}

          />
       
          <ReactApexChart
            options={options}
            series={[phase3voltage]}
            type="radialBar"
            style={{ background: '#fff', height: "110px", borderRadious: "0.5rem" }}

          />
  
          <ReactApexChart
            options={options}
            series={[threephasevoltage]}
            type="radialBar"
            style={{ background: '#fff', maxHeight: "110px", borderRadious: "0.5rem" }}

          /> */}

    </div>
    <div class="space-y-4">
      <AddCards
        icon={<PiWaveSineFill />}
        title="Current"
        count={phase1current}
        unit="A"
        bgColor="lg:bg-[#ffffff]"
        smBgColor="bg-[#4B9CD3]"

      />
      <AddCards
        icon={<PiWaveSineFill />}
        title="Current"
        count={phase2current}
        unit="A"
        bgColor="lg:bg-[#ffffff]"
        smBgColor="bg-[#78A845]"

      />
      <AddCards
        icon={<PiWaveSineFill />}
        title="Current"
        count={phase3current}
        unit="A"
        bgColor="lg:bg-[#ffffff]"
        smBgColor="bg-[#FFF176]"

      />
      <AddCards
        icon={<PiWaveSineFill />}
        title="Current"
        count={phase1current}
        unit="A"
        bgColor="lg:bg-[#ffffff]"
        smBgColor="bg-[#BA6C86]"

      />
    </div>
    <div class="space-y-4">
      <AddCards
        icon={<SiPowerbi />}
        title="Power"
        count={phase1power}
        unit="Kw"
        bgColor="lg:bg-[#ffffff]"
        smBgColor="bg-[#4B9CD3]"

      />
      <AddCards
        icon={<SiPowerbi />}
        title="Power"
        count={phase2power}
        unit="Kw"
        bgColor="lg:bg-[#ffffff]"
        smBgColor="bg-[#78A845]"

      />
      <AddCards
        icon={<SiPowerbi />}
        title="Power"
        count={phase3power}
        unit="Kw"
        bgColor="lg:bg-[#ffffff]"
        smBgColor="bg-[#FFF176]"

      />
      <AddCards
        icon={<SiPowerbi />}
        title="Active-Power"
        count={ThreephasePower}
        unit="Kw"
        bgColor="lg:bg-[#ffffff]"
        smBgColor="bg-[#BA6C86]"

      />
    </div>
    <div class="space-y-4">
      <AddCards
        icon={<BsLightningCharge />}
        title="Energy"
        count={phase1energy}
        unit="W/h"
        bgColor="lg:bg-[#ffffff]"
        smBgColor="bg-[#4B9CD3]"

      />
      <AddCards
        icon={<BsLightningCharge />}
        title="Energy"
        count={phase2energy}
        unit="W/h"
        bgColor="lg:bg-[#ffffff]"
        smBgColor="bg-[#78A845]"

      />
      <AddCards
        icon={<BsLightningCharge />}
        title="Energy"
        count={phase3energy}
        unit="W/h"
        bgColor="lg:bg-[#ffffff]"
        smBgColor="bg-[#FFF176]"

      />
      <AddCards
        icon={<BsLightningCharge />}
        title="Energy"
        count={threephaseenergy}
        unit="W/h"
        bgColor="lg:bg-[#ffffff]"
        smBgColor="bg-[#BA6C86]"

      />
    </div>
    <div class="space-y-4">
      <AddCards
        icon={<GiLightningFrequency />}
        title="Frequency"
        count={phase1frequency}
        unit="Hz"
        bgColor="lg:bg-[#ffffff]"
        smBgColor="bg-[#4B9CD3]"

      />
      <AddCards
        icon={<GiLightningFrequency />}
        title="Frequency"
        count={phase2frequency}
        unit="Hz"
        bgColor="lg:bg-[#ffffff]"
        smBgColor="bg-[#78A845]"

      />
      <AddCards
        icon={<GiLightningFrequency />}
        title="Frequency"
        count={phase3frequency}
        unit="Hz"
        bgColor="lg:bg-[#ffffff]"
        smBgColor="bg-[#FFF176]"

      />
      <SplitCards
        icon={<BsLightningCharge />}
        title="Frequency"
        count={frequency}
        unit="Hz"
        bgColor="lg:bg-[#ffffff]"
        smBgColor="bg-[#BA6C86]"
      />
      <SplitCards
        icon={<BsLightningCharge />}
        title="Apparent"
        count={apparent}
        unit="KVA"
        bgColor="lg:bg-[#ffffff]"
        smBgColor="bg-[#BA6C86]"
      />
    </div>
    <div class="space-y-4">
      <AddCards
        icon={<TbGeometry />}
        title="Power_Factor	"
        count={phase1power_factor}
        unit="Pf"
        bgColor="lg:bg-[#ffffff]"
        smBgColor="bg-[#4B9CD3]"

      />
      <AddCards
        icon={<TbGeometry />}
        title="Power_Factor"
        count={phase2power_factor}
        unit="Pf"
        bgColor="lg:bg-[#ffffff]"
        smBgColor="bg-[#118A99]"

      />
      <AddCards
        icon={<TbGeometry />}
        title="Power_Factor"
        count={phase3power_factor}
        unit="Pf"
        bgColor="lg:bg-[#ffffff]"
        smBgColor="bg-[#FFF176]"

      />
      <SplitCards
        icon={<BsLightningCharge />}
        title="Power-Fa"
        count={powerfactor}
        unit="pf"
        bgColor="lg:bg-[#ffffff]"
        smBgColor="bg-[#BA6C86]"
      />
      <SplitCards
        icon={<BsLightningCharge />}
        title="Reactive"
        count={reactive}
        unit="KVAR"
        bgColor="lg:bg-[#ffffff]"
        smBgColor="bg-[#BA6C86]"
      />
    </div>
  </div>
</div>

<div className="flex flex-col items-center justify-center">
  <div className="w-full flex flex-col lg:flex-row gap-4 pl-2 pr-2">
    <div className="flex flex-col items-center bg-white rounded-lg p-3 rounded-md shadow-md  md:w-full sm:w-auto">
      <FaCalendarDay className="text-2xl mb-2 text-blue-500" />
      <h3 className="text-xl font-semibold">Today’s Usage</h3>
      <p className="text-lg">{todayUsage} kWh</p>
    </div>
    <div className="flex flex-col items-center bg-white p-3 rounded-md shadow-md md:w-full sm:w-auto">
      <FaCalendarAlt className="text-2xl mb-2 text-green-500" />
      <h3 className="text-xl font-semibold">This Month’s Usage</h3>
      <p className="text-lg">{monthlyUsage} kWh</p>
    </div>
    <div className="flex flex-col items-center bg-white p-3 rounded-md shadow-md  md:w-full sm:w-auto">
      <BsLightningCharge className="text-2xl mb-2 text-red-500" />
      <h3 className="text-xl font-semibold">Generator Usage</h3>
      <p className="text-lg">Usage: 123.45 kWh</p> {/* Dummy data */}
    </div>
  </div>
</div>

<div className="w-full">
  <ReactApexChart
    options={chartData.options}
    series={chartData.series}
    type="bar"
    height={400} // Increase the height for a larger chart view
  />
</div>

<div id="html-dist"></div>
</div>