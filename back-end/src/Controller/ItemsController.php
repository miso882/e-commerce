<?php

namespace App\Controller;

use App\Entity\Items;
use App\Repository\CategoriesRepository;
use App\Repository\ItemsRepository;
use App\Repository\SubcategoryRepository;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Mapping\Entity;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\ParameterBag;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Serializer\Encoder\JsonEncode;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;

class ItemsController extends AbstractController
{
    #[Route('/api/items', name: 'items', methods: ['GET'])]
    // #[IsGranted('ROLE_ADMIN', message: 'Vous n\'avez pas les droits suffisants pour supprimer un utilisateur')]
    public function getUserList(SerializerInterface $serializer, ItemsRepository $itemsRepository): JsonResponse
    {
        $itemsList = $itemsRepository->findBy(array(), array('popularity' => 'DESC'));
        $jsonItemsList = $serializer->serialize($itemsList, 'json', ['groups' => 'getItems']);
        return new JsonResponse($jsonItemsList, Response::HTTP_OK, [], true);
    }

    #[Route('/api/items/{id}', name: 'detailItems', methods: ['GET'])]
    public function getDetailUser(SerializerInterface $serializer, Items $items, ItemsRepository $itemsRepository, $id, EntityManagerInterface $em): JsonResponse
    {
        $item = $itemsRepository->find($id);
        if ($item) {
            $item->setPopularity($item->getPopularity() + 1);
            $jsonItems = $serializer->serialize($items, 'json', ['groups' => 'getItems']);
            $em->flush($item);
            return new JsonResponse($jsonItems, Response::HTTP_OK, ['accept' => 'json'], true);
        }
        return new JsonResponse(null, Response::HTTP_NOT_FOUND);
    }


    #[Route('/api/items', name: "createItems", methods: ['POST'])]
    public function createItem(
        Request $request,
        SerializerInterface $serializer,
        EntityManagerInterface $em,
        UrlGeneratorInterface $urlGenerator,
        UserPasswordHasherInterface $passwordHasher,
        CategoriesRepository $categoriesRepository,
        SubcategoryRepository $subcategoriesRepository,
        ImagesController $imagesController
    ): JsonResponse {
        // var_dump($request->request->getString("name"));
        $temp = json_encode($request->request->all(), JSON_NUMERIC_CHECK);
        json_validate($temp);
        $items = $serializer->deserialize($temp, Items::class, 'json');
        $content = $request->request->all();
        $subcategory = $content['subcategory'] ?? -1;
        $category = $content['category'] ?? -1;
        $items->setImage1($imagesController->upload("image1"));
        $items->setSubCategory($subcategoriesRepository->find($subcategory));
        $items->setCategory($categoriesRepository->find($category));
        $items->setPopularity(0);
        $em->persist($items);
        $em->flush();
        $jsonItems = $serializer->serialize($items, 'json', ['groups' => 'getItems']);
        $location = $urlGenerator->generate('detailItems', ['id' => $items->getId()], UrlGeneratorInterface::ABSOLUTE_URL);
        return new JsonResponse($jsonItems, Response::HTTP_CREATED, ["Location" => $location], true);
    }
    //update
    #[Route('/api/items/{id}', name: "updateItem", methods: ['PUT'])]
    public function updateitem(Request $request, SerializerInterface $serializer, EntityManagerInterface $em, Items $currentitem, CategoriesRepository $categoriesRepository, SubcategoryRepository $subcategoriesRepository): JsonResponse
    {
        $updateitem =  $serializer->deserialize(
            $request->getContent(),
            Items::class,
            'json',
            [AbstractNormalizer::OBJECT_TO_POPULATE => $currentitem]
        );
        $content = $request->toArray();
        $idCategory = $content['idCategory'] ?? $updateitem->getCategory();
        $idSubcategory = $content['idSubcategory'] ?? $updateitem->getSubCategory();
        $updateitem->setCategory($categoriesRepository->find($idCategory));
        $updateitem->setSubCategory($subcategoriesRepository->find($idSubcategory));
        $em->persist($updateitem);
        $em->flush();
        return new JsonResponse(null, JsonResponse::HTTP_NO_CONTENT);
    }
    //delete
    #[Route('/api/items/{id}', name: 'deleteItem', methods: ['DELETE'])]
    public function deleteitem(Items $item, EntityManagerInterface $em): JsonResponse
    {
        $em->remove($item);
        $em->flush();
        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }
}
