// utils/riotApi.ts
const NEXT_PUBLIC_HOST = process.env.NEXT_PUBLIC_HOST;

export async function getChampionRotation() {
  const res = await fetch(`${NEXT_PUBLIC_HOST}/api/rotation`);
  if (!res.ok) {
    throw new Error("로테이션 데이터를 가져오는 데 실패했습니다.");
  }
  return res.json();
}
