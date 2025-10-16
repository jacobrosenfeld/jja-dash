import { NextRequest, NextResponse } from 'next/server';
import { put, head } from '@vercel/blob';
import { Item } from '@/lib/types';

const BLOB_KEY = 'items.json';

async function getItems(): Promise<Item[]> {
  try {
    const blob = await head(BLOB_KEY);
    if (!blob) return [];
    const response = await fetch(blob.url);
    return response.json();
  } catch {
    return [];
  }
}

async function saveItems(items: Item[]) {
  await put(BLOB_KEY, JSON.stringify(items), { access: 'public' });
}

export async function GET() {
  const items = await getItems();
  return NextResponse.json(items);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { title, subtitle, link, image } = body;
  if (!title || !link) {
    return NextResponse.json({ error: 'Title and link required' }, { status: 400 });
  }
  const items = await getItems();
  const newItem: Item = {
    id: Date.now().toString(),
    title,
    subtitle: subtitle || '',
    link,
    image: image || '',
  };
  items.push(newItem);
  await saveItems(items);
  return NextResponse.json(newItem);
}

export async function DELETE(request: NextRequest) {
  const body = await request.json();
  const { id } = body;
  if (!id) {
    return NextResponse.json({ error: 'ID required' }, { status: 400 });
  }
  const items = await getItems();
  const filtered = items.filter(item => item.id !== id);
  await saveItems(filtered);
  return NextResponse.json({ success: true });
}