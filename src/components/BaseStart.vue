<template>
  <div class="stats shadow-lg w-full grid-cols-4 cursor-default">
    <!-- 本月总成交量 -->
    <div class="stat">
      <div class="stat-figure text-primary-focus">
        <svg xmlns="http://www.w3.org/2000/svg" class="inline-block w-8 h-8 stroke-current" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      </div>
      <div class="stat-title">本月总成交量</div>
      <div class="stat-value text-primary-focus">389</div>
      <div class="stat-desc">比上月增加21%</div>
    </div>
    <!-- 本月总成交金额（￥） -->
    <div class="stat">
      <div class="stat-figure text-secondary">
        <svg xmlns="http://www.w3.org/2000/svg" class="inline-block w-8 h-8 stroke-current" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
      </div>
      <div class="stat-title">本月总成交金额（￥）</div>
      <div class="stat-value text-secondary">25630</div>
      <div class="stat-desc">比上月增加10%</div>
    </div>
    <!-- 本月总收益 -->
    <div class="stat">
      <div class="stat-figure text-secondary">
        <svg xmlns="http://www.w3.org/2000/svg" class="inline-block w-8 h-8 stroke-current" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      </div>
      <div class="stat-title">本月总收益</div>
      <div class="stat-value">42000</div>
      <div class="stat-desc">↗︎ 40000 (22%)</div>
    </div>
    <!-- 待办信息 -->
    <div class="stat">
      <div class="stat-figure text-secondary">
        <div class="avatar online">
          <div class="w-16 rounded-full">
            <img src="https://api.lorem.space/image/fashion?w=128&h=128" alt="代办信息" />
          </div>
        </div>
      </div>
      <div class="stat-value">86%</div>
      <div class="stat-title">完成的任务</div>
      <div class="stat-desc text-secondary">剩余12个待办信息</div>
    </div>

  </div>
</template>